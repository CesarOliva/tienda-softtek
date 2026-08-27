
interface InputProps {
    label: string;
    name: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
    maxLength?: number;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

const Input = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
    maxLength,
    inputMode,
}: InputProps) => {
    return (
        <div>
            <label htmlFor={name} className="mb-2 block text-sm font-medium text-zinc-300">{label}</label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                maxLength={maxLength}
                inputMode={inputMode}
                className="w-full rounded-lg border border-neutral-700  bg-neutral-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:outline-none"
            />
        </div>
    );
};
 
export default Input;