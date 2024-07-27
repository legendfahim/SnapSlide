document.addEventListener("DOMContentLoaded", () => {
  const files = document.querySelector("#files");
  const uploadBtn = document.querySelector(".upload-box");
  const add = document.querySelector(".add");
  const allList = document.querySelector(".all-list");
  const doneBtn = document.querySelector(".doneBtn");
  const title = document.querySelector(".title");
  const index = document.querySelector(".index");
  const main = document.querySelector(".main");
  const slide = document.querySelector(".slide");
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  const boxTitle = document.querySelector(".box-title");

  let replaceIndex = -1;
  let count = 0;
  let interval;

  // Array to hold image data for display
  const listElement = [];

  // Array to hold saved image data
  const savedImages = [];

  // Hide the "Add" button initially
  add.style.display = "none";

  // Show the file input dialog when clicking the upload button
  uploadBtn.addEventListener("click", () => {
    files.click();
  });

  // Listen for changes in the file input
  files.addEventListener("change", () => {
    if (files.files.length > 0) {
      add.style.display = "none";
      add.click();
    } else {
      add.style.display = "none";
    }
    checkDone();
  });

  // Reload the page on title click
  title.addEventListener("click", () => {
    window.location.reload();
  });

  // Show slider when "Done" button is clicked
  doneBtn.addEventListener("click", () => {
    index.classList.add("hidden");
    main.classList.remove("hidden");
    document.title = "Showing Presentation || Developed by Istiak Rahman";
    showPresentation(count); // Start the presentation
  });

  // Add file to list and savedImages
  add.addEventListener("click", () => {
    if (files.files.length > 0) {
      const file = files.files[0];
      const fileName = file.name;
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileUrl = event.target.result;

        if (replaceIndex > -1) {
          // Replace the existing item at replaceIndex in listElement
          listElement[replaceIndex] = { fileName, fileUrl };
          savedImages[replaceIndex] = { fileName, fileUrl };
          replaceIndex = -1;
        } else {
          // Add a new item
          listElement.push({ fileName, fileUrl });
          savedImages.push({ fileName, fileUrl });
        }

        updateList();

        // Reset the file input and hide the "Add" button after adding the file
        files.value = "";
        add.style.display = "none";
      };

      reader.readAsDataURL(file);
    }
  });

  // Navigate to previous slide
  left.addEventListener("click", () => {
    if (listElement.length > 0) {
      count = count > 0 ? count - 1 : listElement.length - 1;
      showPresentation(count);
    }
  });

  // Navigate to next slide
  right.addEventListener("click", () => {
    if (listElement.length > 0) {
      count = count < listElement.length - 1 ? count + 1 : 0;
      showPresentation(count);
    }
  });

  // Function to update the list of uploaded images
  const updateList = () => {
    allList.innerHTML = "";
    listElement.forEach((item, index) => {
      const li = document.createElement("li");
      const spanName = document.createElement("span");
      const imgElement = document.createElement("img");
      const btn = document.createElement("button");
      const spanBtn = document.createElement("span");
      const spanX = document.createElement("span");

      spanName.classList.add("name");
      spanName.textContent = item.fileName;
      imgElement.src = item.fileUrl;
      imgElement.style.width = "100px"; // Adjust as needed
      btn.textContent = "Replace";
      spanX.className = "delete";
      spanX.textContent = "X";
      spanBtn.appendChild(btn);
      spanBtn.classList.add("btn");
      li.classList.add("img");
      li.appendChild(imgElement);
      li.appendChild(spanName);
      li.appendChild(spanBtn);
      li.appendChild(spanX);

      // Add delete event listener
      spanX.addEventListener("click", () => {
        listElement.splice(index, 1);
        savedImages.splice(index, 1);
        updateList();
      });

      // Add replace event listener
      btn.addEventListener("click", () => {
        replaceIndex = index;
        files.click();
      });

      allList.appendChild(li);
    });
    checkDone();
    checkBoxTitle();
  };

  // Function to update the title based on the list length
  const checkBoxTitle = () => {
    if (listElement.length > 0) {
      boxTitle.textContent = "Your uploaded photos";
    } else {
      boxTitle.textContent = "Empty list...";
    }
  };
  checkBoxTitle();

  // Function to check if the "Done" button should be visible
  const checkDone = () => {
    if (listElement.length > 0) {
      doneBtn.classList.remove("hidden");
    } else {
      doneBtn.classList.add("hidden");
    }
  };

  // Function to show slides with animation
  const showPresentation = (index) => {
    if (listElement.length > 0) {
      slide.style.opacity = 0; // Start with slide hidden
      setTimeout(() => {
        slide.src = `${listElement[index].fileUrl}`;
        // title.textContent = listElement[index].fileName;
        slide.style.opacity = 1; // Fade in
      }, 500); // Delay to allow the opacity change

      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        count = (count + 1) % listElement.length;
        showPresentation(count);
      }, 3000);
    }
  };

  // Initial call to start the presentation if there are items
  if (listElement.length > 0) {
    showPresentation(count);
  }
});
