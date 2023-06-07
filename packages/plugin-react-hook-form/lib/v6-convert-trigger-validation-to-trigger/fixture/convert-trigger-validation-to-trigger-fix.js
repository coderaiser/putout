import {useForm} from "react-hook-form";

const {
    register,
    trigger,
    errors,
} = useFormContext();

async function main() {
    await trigger();
}
