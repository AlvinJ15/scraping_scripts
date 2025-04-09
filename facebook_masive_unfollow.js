// Visit https://www.facebook.com/<USER>/following and scroll down to load following, and then run the script.

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function hoverFirstChildOfGrandParent(cancelButton) {
    let targetParent = cancelButton;
    for (let i = 0; i < 4; i++) {
        if (targetParent.parentElement) {
            targetParent = targetParent.parentElement;
        } else {
            console.error("Reached top of DOM before finding desired parent.");
            return;
        }
    }
    const firstChild = targetParent.firstElementChild;
    if(firstChild instanceof HTMLElement){
        const event = new MouseEvent('mouseover', {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        firstChild.dispatchEvent(event);
        try {
            await sleep(500);
            const followButton = document.querySelector('div[aria-label="Following"]');
            followButton.click();
            await sleep(500);
            const possibleButtons = document.querySelectorAll('div.xu06os2.x1ok221b');
            for (var i =0; i< possibleButtons.length; i++){
                if (possibleButtons[i].innerText === 'Unfollow'){
                    unfollowButton = possibleButtons[i];
                    if (unfollowButton instanceof HTMLElement) {
                        const event2= new MouseEvent('mouseover', {
                            view: window,
                            bubbles: true,
                            cancelable: true,
                        });
                        unfollowButton.dispatchEvent(event2);
                        unfollowButton.click();
                        console.log('Unfollow clicked!');
                    } else {
                        console.error("Div with classes 'xu06os2 x1ok221b' not found.");
                    }
                    break;    
                }
            }
            const closeButtons = document.querySelectorAll('div[aria-label="Close"]');
            for (var i =0; i< closeButtons.length; i++){
                closeButtons[i].click()
            }
        }
        catch(Exception){
            console.log('exception');
        }
    } else {
      console.error("first child not found or is not an HTMLElement.");
    }
  }
async function clickCancelRequests() {
    // Select all divs with the specified aria-label
    const cancelButtons = document.querySelectorAll('div[aria-label="Add friend"]');

    // Iterate through the selected elements and click each one
    for (var i=0; i<cancelButtons.length;i++){
        var button = cancelButtons[i];
        try{
            if (button instanceof HTMLElement) { //Ensure it is an HTMLElement
                await hoverFirstChildOfGrandParent(button);
                //button.click();
            }
        }
        catch(Exception)
        {
            console.log('Exception 2')
        }
        //break;
    }
}

async function processData() {
    try {
      console.log("Fetching Data...");
      const result = await clickCancelRequests(); // Pause execution until Promise resolves
      console.log("Result:", result);
      // Do something with the fetched data
    } catch (error) {
      console.error("Error:", error);
    }
  }

processData()
  
