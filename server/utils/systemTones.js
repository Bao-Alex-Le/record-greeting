const systemTones = {
  getTones(system, phoneNumber, extension, password, isCorporate, timeOfDay=null) {
    const tones = {
      toshiba: {
        personal: {
          startDigits: "www*ww" + extension + "#wwww" + password + "#wwwwwwww3wwwwww1wwwwww1wwwwww2wwwwwwwwwwwwwwww",
    			endDigits: "ww#wwwww9www"
        },
        corporate: {
          day: {
            startDigits: "wwww*ww990#wwwwww" + password + "#wwwwwww3wwwwww1wwwwww1wwwwww2wwwwwwwwwwwwwwwwww",
    				endDigits: "ww#wwww9www"
          },
          night: {
            startDigits: "wwww*ww990#wwwwwww" + password + "#wwwwwwww3wwwwww1wwwwww2wwwwwww2wwwwwwwwwwwwwwwwww",
    				endDigits: "ww#wwww9www"
          }
        }
      },
      panasonic: {
        personal: {
          startDigits: "www#6ww*" + extension + "#www" + password + "#wwwwwww3wwwwwww4wwwwwww1wwwwwww1wwwww1wwww2www",
    			endDigits: "ww1wwwww2www"
        },
        corporate: {
          day: {
            startDigits: "ww#6www*998wwww" + password + "#wwwwwww5wwwwwww3wwwwwww1wwwwwww1wwwwwww1wwwww2wwww",
    				endDigits: "ww1wwww2www"
          },
          night: {
            startDigits: "ww#6www*998wwww" + password + "#wwwwwww5wwwwwww3wwwwwww2wwwwwww1wwwwww1wwwww2wwww",
            endDigits: "w1wwww2www"
          }
        }
      },
      bell: {
        personal: {
          startDigits: "www1wwwwwwww" + phoneNumber + "#wwww" + password + "#wwwwwwww4wwwwww3wwwwww1wwwww2wwww2www",
    			endDigits: "ww#wwww#www",
    			numberToCall: '+18772355777'
        },
        corporate: {
          startDigits: "ww1wwwwwwww" + phoneNumber + "#ww" + password + "#wwwwwwww4wwwww3wwwww1wwwww2wwwww2www",
    			endDigits: "ww#ww#ww",
    			numberToCall: '+18772355777'
        }
      },
      rogers: {
        personal: {
          startDigits: "wwwww" + phoneNumber + "#wwww" + password + "#wwwwwwww4wwwwww3wwwwww1wwwwww2wwwww2www",
    			endDigits: "ww#wwww#www",
    			numberToCall: '+18776437786'
        },
        corporate: {
          startDigits: "wwwww" + phoneNumber + "#www" + password + "#wwwwwwww4wwwww3wwwww1wwwww2wwwww2www",
    			endDigits: "ww#www#www",
    			numberToCall: '+18776437786'
        }
      },
      samsung: {
        personal: {
          startDigits: "www#ww" + extension + "wwwww" + password + "wwwwwww7wwwwwww5wwwwww1wwwww2wwwwwww",
    			endDigits: "ww#wwww1www"
        },
        corporate: {
          day: {
            startDigits: "ww#0000wwww" + password + "wwwwwww1wwwww1001wwwwww3wwwww",
    				endDigits: "ww2www#www"
          },
          night: {
            startDigits: "ww#0000www" + password + "wwwwwww1wwwww1002wwwww3wwwww",
    				endDigits: "w2wwww#www"
          }
        }
      },
      nortel: {
        personal: {
          startDigits: "wwwwww**wwww" + extension + password + "#wwwwwwwwww8wwwwwwww2wwwwwww1wwwwww1wwwww1wwwww1wwww",
    			endDigits: "www#wwwww#www"
        }
      },
      telstra: {
        personal: {
          startDigits: "wwwwwww" + phoneNumber + "#wwww" + password + "#wwwwwww*www3wwwww1wwwww1wwww1wwwwwwwwww",
    			endDigits: "#wwwww2ww",
    			numberToCall: '+61418707102'
        }
      },
      vodafone1: {
        personal: {
          startDigits:  "wwwwww" + phoneNumber + "#wwww" + password + "#wwwwww*wwwwww2wwww1wwww3wwwwwwwwwwwwwwwww",
    			endDigits: "#wwwww2ww",
    			numberToCall: '+61414121121'
        }
      },
      vodafone2: {
        personal: {
          startDigits:  "wwwwww" + phoneNumber + "#wwww" + password + "#wwwwww*wwwwww2wwww1wwww1wwwwwwwwwwwwwwwww",
    			endDigits: "#wwwww2ww",
    			numberToCall: '+61414121121'
        }
      }
    }

    const callTones = isCorporate ? tones[system]['corporate'][timeOfDay] : tones[system]['personal'];
    return callTones;
  }
}

module.exports = systemTones;
