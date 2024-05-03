"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader";

export const Form = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const setPasswordInput = (value: string): void => {
    setPassword(value);
  };

  const setEmailInput = (value: string): void => {
    setEmail(value);
  };

  const submitForm = async (
    value: React.FormEvent<HTMLInputElement>
  ): Promise<boolean> => {
    value.preventDefault();

    setLoading(true);

    const loginResponse = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (loginResponse && !loginResponse.error && loginResponse.ok) {
      router.replace("/");
    }

    setLoading(false);

    return false;
  };

  return (
    <form>
      {loading && <Loader />}
      <input
        type="text"
        name="email"
        value={email}
        onChange={(value: React.FormEvent<HTMLInputElement>) =>
          setEmailInput(value.currentTarget.value)
        }
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(value: React.FormEvent<HTMLInputElement>) =>
          setPasswordInput(value.currentTarget.value)
        }
      />
      <input
        type="submit"
        value="Submit"
        onClick={(value: React.FormEvent<HTMLInputElement>) =>
          submitForm(value)
        }
      />
    </form>
  );
};
