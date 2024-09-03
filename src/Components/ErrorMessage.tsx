

export default function ErrorMessage({errorMessage}: {errorMessage:string}) {
  return <div className="feedback-list-container">{errorMessage}</div>;
}
