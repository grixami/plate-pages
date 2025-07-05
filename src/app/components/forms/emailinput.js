export default function EmailInput({placeholder, name}) {
    return (
        <input type="email" className="border-b-2 p-1 focus:outline-none focus:border-[#4091b1]" placeholder={placeholder} name={name}></input>
    )
}