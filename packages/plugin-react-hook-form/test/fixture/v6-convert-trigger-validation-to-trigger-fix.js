import { useForm } from "react-hook-form";

const { register, trigger, formState: {
  errors
} } = useForm();

trigger();
