export default function HashtagItem({companyName}:{companyName:string}) {
  return (
    <li>
      <button> #{companyName}</button>
    </li>
  );
}
