import { useForm } from "react-hook-form";

const { register, triggerValidation, errors } = useFormContext();

async function main() {
    await triggerValidation();
}
