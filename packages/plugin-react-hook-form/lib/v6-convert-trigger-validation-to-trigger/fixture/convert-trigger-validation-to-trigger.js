import { useForm } from "react-hook-form";

function main() {
    const { register, triggerValidation, errors } = useFormContext();

    useMemo(async () => {
        await triggerValidation();
    }, [triggerValidation]);
}
