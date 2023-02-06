import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({ request }) => {
  // We need access to the query parameters in the URL by using the default browser feature new URL() and passing request.url into it, which gives us the full url. from that we can access searchParams, which will give us the query parameters.  We can access a specific one by using searchParams.get('mode') to access the mode parameter.  If that doesnt exist we pass 'login' into it.

  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();

  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const res = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  // status 422 = invalid user input
  // status 401 = incorrect credentials

  if (res.status === 422 || res.status === 401) {
    // If these are true, in other words, if there is a problem we can simply return the response.  React router will automatically extract the data for you.
    return res;
  }

  if (!res.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  const resData = await res.json();
  const token = resData.token;

  localStorage.setItem('token', token);

  return redirect('/');
};
