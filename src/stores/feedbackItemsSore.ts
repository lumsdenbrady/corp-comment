import { create } from "zustand";
import { feedbackItemT, feedbackListT } from "../lib/types";
type Store = {
  feedbackList: feedbackListT;
  isLoading: boolean;
  errorMessage: string;
  filterValue: string;
  setFilterValue: (companyName: string) => void;
  getCompanyNames: () => string[];
  getFilteredFeedbackList: () => feedbackListT;
  addFeedbackItemToList: (text: string) => void;
  fetchFeedbackList: () => Promise<void>;
};
const refactorItem = (
  text: string,
  itemId?: number,
  itemDate?: number,
  upvotes?: number
) => {
  const currentDate = new Date();
  const company = text.split("#")[1].split(" ")[0].split(",")[0];
  const firstChar = company[0].slice(0, 1);
  const newItem: feedbackItemT = {
    itemId: itemId || currentDate.getTime(),
    bodyText: text,
    itemDate: itemDate || currentDate.getTime(),
    upvotes: upvotes || 0,
    badgeLetter: firstChar,
    companyName: company,
  };
  return newItem;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackList: [],
  isLoading: true,
  errorMessage: "",
  filterValue: "",
  setFilterValue: (companyName: string) => {
    const { filterValue } = get();
    if (filterValue === companyName) {
      set(() => ({ filterValue: "" }));
    } else {
      set(() => ({ filterValue: companyName }));
    }
  },
  getCompanyNames: () => {
    return get().feedbackList.map((item: feedbackItemT) => item.companyName);
  },
  getFilteredFeedbackList: () => {
    const state = get();
    if (state.filterValue) {
      return [...state.feedbackList].filter((item) => {
        return item.companyName === state.filterValue;
      });
    } else return state.feedbackList;
  },
  addFeedbackItemToList: (inputText: string) => {
    const sendNewItem = async (item: feedbackItemT) => {
      const today = new Date();
      const differenceInTime = today.getTime() - item.itemDate;
      const days = Math.round(differenceInTime / (1000 * 3600 * 24));
      const apiRefactoredItem = {
        id: item.itemId,
        company: item.companyName,
        badgeLetter: item.badgeLetter,
        upvoteCount: item.upvotes,
        daysAgo: days,
        text: item.bodyText,
      };
      try {
        const res = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(apiRefactoredItem),
          }
        );
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          console.log(res);
          return;
        }
      } catch (error: unknown) {
        console.log(error);
      }
    };
    const newItem: feedbackItemT = refactorItem(inputText);

    set((state) => ({ feedbackList: [...state.feedbackList, newItem] }));

    //send data to server
    sendNewItem(newItem);
  },
  fetchFeedbackList: async () => {
    set(() => ({ isLoading: true }));

    try {
      const res = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      const data = await res.json();
      if (!res.ok) {
        return;
      }

      console.log(data);
      const newList = data.feedbacks.map((item) => {
        const d = new Date();
        const itemDateFull = d.getTime() - item.daysAgo * 86400000;
        return refactorItem(item.text, item.id, itemDateFull, item.upvoteCount);
      });

      set(() => ({ isLoading: false }));
      return set((state) => ({ ...state, feedbackList: newList }));
    } catch (error) {
      console.log(error);
      set(() => ({
        errorMessage:
          "An error occurred retrieving the data from the server. Please reload the page.",
      }));
      set(() => ({ isLoading: false }));
    }
  },
}));
