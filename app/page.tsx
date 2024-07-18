"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../amplify_outputs.json";

import { generateClient } from "aws-amplify/data";
import { ChangeEvent, useState, FormEvent } from "react";
import { type Schema } from "../amplify/data/resource";

export default function Page() {
  const client = generateClient<Schema>({
    authMode: "userPool",
  });

  interface FormData {
    email: string;
    username: string;
    companyName: string;
    roles: string[];
  }

  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    companyName: "",
    roles: [],
  });

  const handleChangeUserCreate = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, selectedOptions } = e.target as HTMLInputElement &
      HTMLSelectElement;

    if (name === "roles") {
      const selectedRoles = Array.from(
        selectedOptions,
        (option) => option.value
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        roles: selectedRoles,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);

  const handleSubmitCreateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const response: any = await client.mutations.crearteUser({
        name: "hello",
        email: formData.email,
        user_pool_id: awsExports.auth.user_pool_id,
        userGroupList: formData.roles,
      });

      console.log(response.data);

      const userResponse = JSON.parse(response.data.body);
      console.log("userResponse", userResponse);

      if (response.data.statusCode === 200) {
        const { errors: companyErrors, data: newCompany } =
          await client.models.Company.create({
            name: formData.companyName,
          });

        if (companyErrors) {
          console.error("Company creation errors:", companyErrors);
          return;
        }

        if (!newCompany || !newCompany.id) {
          throw new Error("Invalid new company response");
        }

        if (companyErrors) {
          // handle company creation errors here
          console.error("Company creation errors:", companyErrors);
          return;
        } else if (newCompany) {
          console.log("newCompany", newCompany);

          const { errors: userErrors, data: newUser } =
            await client.models.User.create({
              name: formData.username,
              email: formData.email,
              companyId: newCompany.id,
              id: userResponse.Username,
              userGroupList: formData.roles,
            });

          if (userErrors) {
            // handle user creation errors here
            console.error("User creation errors:", userErrors);
            return;
          }

          console.log("newUser", newUser);
        }
      }
    } catch (error) {
      console.error("Error creating user:", error);
      // handle the error appropriately, maybe set errors in the state to display in the UI
    }
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <div className="row">
            <div className="col-md-6">
              <h1>create cognito user</h1>

              <form
                onSubmit={handleSubmitCreateUser}
                className="container mt-5"
              >
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChangeUserCreate}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChangeUserCreate}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="companyName" className="form-label">
                    Company Name:
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="form-control"
                    value={formData.companyName}
                    onChange={handleChangeUserCreate}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="roles" className="form-label">
                    Roles:
                  </label>
                  <select
                    id="roles"
                    name="roles"
                    multiple
                    value={formData.roles}
                    onChange={handleChangeUserCreate}
                    className="form-control"
                    required
                  >
                    <option value="SUPERADMIN">SUPERADMIN</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Create user
                </button>
              </form>

              <button className="btn btn-success" onClick={signOut}>
                Sign out
              </button>
            </div>
          </div>
        </main>
      )}
    </Authenticator>
  );
}
