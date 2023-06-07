import {useForm} from "react-hook-form";

function main() {
    const {
        register,
        trigger,
        errors,
    } = useFormContext();
    
    useMemo(async () => {
        await trigger();
    }, [trigger]);
}
