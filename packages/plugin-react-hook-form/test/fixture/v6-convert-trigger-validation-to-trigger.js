import { useForm } from "react-hook-form";

const { register, triggerValidation, errors } = useForm();

triggerValidation();
