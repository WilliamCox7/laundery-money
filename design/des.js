var views = {
  login: {
    frame: {
      section1: {
        description: "Introduction Animation",
        elements: {
          div: "Indroduction video"
        },
        mvp: false
      },
      section2: {
        login: {
          description: "User can enter credentials to login",
          methods: {
            1: "facebook auth",
            2: "google plus auth",
            3: "normal auth"
          },
          elements: {
            div: {
              input1: "Text",
              input2: "Password",
              button1: "Login with Facebook",
              button2: "Login with G+"
            }
          },
          mvp: true
        },
        signUp: {
          description: "User can create an account",
          elements: {
            input1: "Text",
            input2: "Password",
            button: "Sign Up"
          },
          mvp: true
        }
      }
    }
  },
  gettingStarted: {
    description: "Shows where everything is in the app with animation",
    action: "On click, move on to the next explanation",
    mvp: false
  },
  home: {
    
  }
}