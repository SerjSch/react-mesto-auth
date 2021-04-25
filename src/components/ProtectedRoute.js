// ProtectedRoute.js
import React from "react";
import { Route, Redirect } from "react-router-dom";
// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ component: Component, children, ...props }) => {
  return (
    <Route>
      {() =>
        props.isLoggedIn ? (
          <>
            <Component {...props} />
            {children}
          </>
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    </Route>
  );
};
export default ProtectedRoute;

// props.children также попадут и в сам Component. 
// Если Component использует внутри себя children, то вложенные элементы будут дважды добавлены в разметку.  
// Чтобы этого избежать в деструктуризации свойств ProtectedRoute необходимо отделить children от props.
// не понятно как что