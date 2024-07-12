"use client";  // This marks the component as a Client Component

import React , { useState , ChangeEvent, FormEvent }from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import { signIn } from 'aws-amplify/auth'

// export const metadata: Metadata = {
//   title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Signin Page TailAdmin Dashboard Template",
// };

const changepassword: React.FC = () => {


  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = e.target;
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });

    // console.log(formData)
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send formData to your API or server
    // try {

    //   let user = await signIn({
    //     username:formData.email,
    //     password: formData.password,
    //   })
    //    console.log("user,",user)
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };
  return (
    <>
      change changepassword
    </>
  );
};

export default changepassword;
