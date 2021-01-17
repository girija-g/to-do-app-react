import React, { useState } from "react"
import db from "../firebase/Firebase"
import "./Login.css"
import { connect } from "react-redux"
import { setUserDetails } from "../actions"

const Login = (props) => {
  const [userName, setUserName] = useState("")
  const [fullName, setFullName] = useState({ firstName: "", lastName: "" })
  const [active, setActive] = useState("login")
  const signIn = (e) => {
    const dbRef = db.collection("users").doc(userName)

    if (active === "login") {
      if (userName.trim() === "") {
        return window.alert("Please enter the username")
      }

      dbRef.onSnapshot((snapshot) => {
        const user = snapshot.data()
        if (user === undefined) {
          return window.alert("Username incorrect/user does not exist")
        }
        props.setUserDetails(user.userName, user.firstName, user.lastName)
        window.alert("Login successful!")
      })
    } else {
      dbRef.get().then((response) => {
        if (response.data() !== undefined) {
          return window.alert("UserName already taken.")
        } else {
          if (
            (userName.trim() ||
              fullName.firstName.trim() ||
              fullName.lastName.trim()) === ""
          ) {
            return window.alert("Please enter all the fields")
          }

          dbRef.set({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            userName
          })

          window.alert("User Signup successful.")
          props.setUserDetails(userName, fullName.firstName, fullName.lastName)
        }
      })
    }
  }
  return (
    <div className="login">
      <div className="login__container">
        <div>
          <span
            onClick={() => setActive("login")}
            style={active === "login" ? { color: "red" } : null}
          >
            <h2>Login</h2>
          </span>
          <span
            onClick={() => setActive("signup")}
            style={active === "signup" ? { color: "red" } : null}
          >
            <h2>Sign Up</h2>
          </span>
        </div>

        <form onSubmit={(e) => signIn(e)}>
          {active === "login" ? (
            <div>
              <label>UserName</label>
              <input
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
          ) : (
            <div>
              <div style={{ margin: "10px" }}>
                <label>UserName</label>
                <input
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                />
              </div>
              <div style={{ margin: "10px" }}>
                <label>First Name</label>
                <input
                  value={fullName.firstName}
                  onChange={(event) =>
                    setFullName({ ...fullName, firstName: event.target.value })
                  }
                />
              </div>
              <div style={{ margin: "10px" }}>
                <label>Last Name</label>
                <input
                  value={fullName.lastName}
                  onChange={(event) =>
                    setFullName({ ...fullName, lastName: event.target.value })
                  }
                />
              </div>
            </div>
          )}
        </form>
        <button onClick={(e) => signIn(e)} type="submit">
          Sign In
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { userDetails: state.userDetails }
}

export default connect(mapStateToProps, { setUserDetails })(Login)
