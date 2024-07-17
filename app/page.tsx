'use client'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import awsExports from '../amplify_outputs.json';

import { generateClient } from 'aws-amplify/data';
import { useState } from 'react';
import { type Schema } from '../amplify/data/resource'

export default function Page() {
  const client = generateClient<Schema>({
    authMode: 'userPool',
  });

  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);      
  const handleLikePost = async () => {
  try {
    const response = await client.mutations.crearteUser(
      { name: 'hello' ,email:"viroyic609@stikezz.com" ,user_pool_id:awsExports.auth.user_pool_id}
    );
    setData(response.data);
    console.log(response.data)
    const myArr:any = JSON.parse(response.data.body);
    console.log("test",myArr)
    setErrors(response.errors);
  } catch (error) {
    console.error("Error liking post:", error);
    setErrors([error]);
  }
};

  return(

    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <div className='row'>
            <div className='col-md-6'>


          <button className='btn btn-success' onClick={signOut}>Sign out</button>
          <button className='btn btn-success' onClick={handleLikePost}>create user</button>

            </div>


          </div>
        </main>
      )}
      </Authenticator>

  )

}