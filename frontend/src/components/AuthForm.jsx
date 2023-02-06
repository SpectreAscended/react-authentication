import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  // useSearchParams is a react-router-dom hook that allows us to gain access to the "query parameters".  <-- the parameters in the url that are like www.example.com/?mode=
  // It returns an array containing searchParams and setSearchParams.  Here, we don't need to set it, so we only use the searchParams to access the data.
  // We can access this by calling the 'get' method and passing in the value we want to retrieve. in this situation it is 'mode'.  We check if mode is equal to 'login', if not we assume we are in signup mode. ie: isLogin is set to true.

  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map(err => (
              <li key={err} style={{ color: 'darkred' }}>
                {err}
              </li>
            ))}
          </ul>
        )}
        {data && data.message && (
          <p style={{ color: 'darkred' }}>{data.message}</p>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            name="password"
            required
          />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
