export default function PasswordInput({placeholder, maxLen, name}) {
    return (
        <input type="password" maxLength={maxLen} className="border-b-2 p-1 focus:outline-none focus:border-[#4091b1]" placeholder={placeholder} name={name}></input>
    )
}