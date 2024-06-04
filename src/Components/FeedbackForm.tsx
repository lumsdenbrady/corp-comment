export default function FeedbackForm() {
  return (
    <form className={`form form--valid`}>
      <textarea placeholder="bla" id="itemTextArea" />
      <label htmlFor="itemTextarea">
        Enter your feedback here, remember to #hashtag the company
      </label>

      <div>
        <p className="u-italic">150</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
