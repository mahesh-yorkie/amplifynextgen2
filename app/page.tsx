"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../amplify_outputs.json";

import { generateClient } from "aws-amplify/data";
import { useState } from "react";
import { type Schema } from "../amplify/data/resource";

export default function Page() {
  const client = generateClient<Schema>({
    authMode: "userPool",
  });

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    companyName: "",
    roles: [],
  });

  const handleChangeUserCreate = (e) => {
    const { name, value } = e.target;
    if (name === "roles") {
      const selectedRoles = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData({
        ...formData,
        roles: selectedRoles,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);

  const handleSubmitCreateUser = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);

    // Example of submitting data to an API endpoint
    try {
      const response: any = await client.mutations.crearteUser({
        name: "hello",
        email: formData.email,
        user_pool_id: awsExports.auth.user_pool_id,
        userGroupList: formData.roles,
      });
      //setData(response.data);
      console.log(response.data);
      const userResponce: any = JSON.parse(response.data.body);
      console.log("userResponce", userResponce);
      if (response.data.statusCode === 200) {
        const { errors: any, data: newCompany } =
          await client.models.Company.create({
            name: formData.companyName,
          });

        console.log("newCompany", newCompany);

        const { errors, data: newUser } = await client.models.User.create({
          name: formData.username,
          email: formData.email,
          companyId: newCompany.id,
          id: userResponce.Username,
          userGroupList: formData.roles,
        });

        console.log("newUser", newUser);
      }

      //setErrors(response.errors);
    } catch (error) {
      console.error("Error liking post:", error);
      //setErrors([error]);
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
