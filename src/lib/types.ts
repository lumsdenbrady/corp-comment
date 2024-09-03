export type feedbackItemT = {
    itemId: number;
    bodyText: string;
    itemDate: number;
    upvotes: number;
    badgeLetter: string;
    companyName: string;
  };
  
  export type feedbackListStateT = {
    feedbackList?: feedbackItemT[];
    setFeedbackList?: React.Dispatch<React.SetStateAction<feedbackItemT[]>>;
  };
  