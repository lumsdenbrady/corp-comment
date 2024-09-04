export type feedbackItemT = {
    itemId: number;
    bodyText: string;
    itemDate: number;
    upvotes: number;
    badgeLetter: string;
    companyName: string;
  };
  export type feedbackListT = feedbackItemT[];
  
  export type feedbackListStateT = {
    feedbackList?: feedbackListT;
    setFeedbackList?: React.Dispatch<React.SetStateAction<feedbackItemT[]>>;
  };
  