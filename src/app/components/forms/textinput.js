export default function TextInput({placeholder, maxLen, pattern, name}) {
    return (
        <input type="text" maxLength={maxLen} className="border-b-2 p-2 focus:outline-none focus:border-[#4091b1]" placeholder={placeholder} pattern={pattern} name={name}></input>
    )
}