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
    description: "Dashboard for the user with options",
    frame: {
      section1: {
        description: "Status Bar",
        elements: {
          h1: "User's Name",
          h2: "Projected Bank Amount",
          h2: "Projected Expenditures",
          h2: "Projected Income",
          h2: "Projected +/-",
          button: "Upload CSV",
          button: "Logout"
        }
      },
      section2: {
        description: "Options",
        elements: {
          div: "Income",
          div: "Expenses",
          div: "Projections"
        }
      }
    }
  },
  upload: {
    description: "Simple view that lets you upload a csv file",
    elements: {
      section1: "Navigation bar (see home section1)",
      section2: {
        description: "Dotted line button",
        action: "On click, pull up open file menu from local computer",
      }
    },
    mvp: false
  },
  income: {
    description: "Information regarding your income",
    action: {
      onOptionClick: {
        ifInitClick: {
          description: "Start Modal Prompt. Prompt for income info"
        }
      }
    },
    elements: {
      section1: {
        description: "Navigation Bar for income related options",
        elements: {
          
        }
      }
    }
  }
}
