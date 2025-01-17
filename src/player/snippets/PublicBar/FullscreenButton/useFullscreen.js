import React from "react";

// hooks
import {useHotkeys} from 'hooks/'

// context
import {usePlayer} from '../../../context/';


function useFullscreen() {
  const player = usePlayer()
  const [active, setActive] = React.useState(false)

  // Hot key
  useHotkeys('ctrl+f', (e, ke) => {
     if(!e.repeat) {
       cls.open()
       return ;
     }
   }, [])


  const fullscreenchanged = (event) => {

    if (document.fullscreenElement) {
      console.log(`Element: ${document.fullscreenElement.id} entered fullscreen mode.`);
      setActive(true)
    } else {
      console.log('Leaving fullscreen mode.');
      setActive(false)
    }

  }

  React.useEffect(() => {
    document.addEventListener('fullscreenchange', fullscreenchanged);

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenchanged);
    }
  }, [])

  const cls = new class {

    constructor() {
      // Get the documentElement (<html>) to display the page in fullscreen
      this.doc = document.documentElement
      this.active = active
    }

    /* View in fullscreen */
    open() {

      if (this.doc.requestFullscreen) {
        this.doc.requestFullscreen()
        .then(() => {
      		// element has entered fullscreen mode successfully
      	})
      	.catch((error) => {
      		console.error({error});
      	});
      } else if (this.doc.webkitRequestFullscreen) { /* Safari */
        this.doc.webkitRequestFullscreen()
        .then(() => {
      		// element has entered fullscreen mode successfully
      	})
      	.catch((error) => {
      		console.error({error});
      	});
      } else if (this.doc.msRequestFullscreen) { /* IE11 */
        this.doc.msRequestFullscreen().then(() => {
      		// element has entered fullscreen mode successfully
      	})
      	.catch((error) => {
      		console.error({error});
      	});
      }
    }

    /* Close fullscreen */
    close() {

      if (document.fullscreenElement) {
        document.exitFullscreen()
          .then(() => console.log("Document Exited from Full screen mode"))
          .catch((err) => console.error(err))
      } else {
        document.documentElement.requestFullscreen();
      }

      // if (document.exitFullscreen) {
      //   document.exitFullscreen();
      // } else if (document.webkitExitFullscreen) { /* Safari */
      //   document.webkitExitFullscreen();
      // } else if (document.msExitFullscreen) { /* IE11 */
      //   document.msExitFullscreen();
      // }
    }
  }

  return cls
};

export default useFullscreen
