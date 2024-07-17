'use client'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

export default function Page() {
  return(

    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
      </Authenticator>

  )

}