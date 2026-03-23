
      const body = document.body;
      const loaderButton = document.getElementById("loaderButton");
      const featuresButton = document.getElementById("featuresButton");
      const utilitiesButton = document.getElementById("utilitiesButton");
      const linksButton = document.getElementById("linksButton");
      const loaderModal = document.getElementById("loaderModal");
      const featuresModal = document.getElementById("featuresModal");
      const utilitiesModal = document.getElementById("utilitiesModal");
      const linksModal = document.getElementById("linksModal");
      const closeButtons = document.querySelectorAll("[data-close]");
      const loaderCode = document.getElementById("loaderCode").textContent;
      const loaderStatus = document.getElementById("loaderStatus");
      const copyLoaderButton = document.getElementById("copyLoaderButton");
      const tabButtons = document.querySelectorAll(".tab-btn");
      const tabPanels = document.querySelectorAll(".tab-panel");
      const modals = [loaderModal, featuresModal, utilitiesModal, linksModal];

      function openModal(modal) {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        body.style.overflow = "hidden";
      }

      function closeModal(modal) {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        if (!document.querySelector(".modal-overlay.active")) {
          body.style.overflow = "";
        }
      }

      async function copyLoaderCode() {
        try {
          await navigator.clipboard.writeText(loaderCode);
          loaderStatus.textContent = "Copied to clipboard.";
          copyLoaderButton.textContent = "Copied";
          window.clearTimeout(copyLoaderButton._resetTimer);
          copyLoaderButton._resetTimer = window.setTimeout(() => {
            copyLoaderButton.textContent = "Copy";
          }, 1500);
        } catch (error) {
          loaderStatus.textContent = "Copy failed.";
          copyLoaderButton.textContent = "Failed";
          window.clearTimeout(copyLoaderButton._resetTimer);
          copyLoaderButton._resetTimer = window.setTimeout(() => {
            copyLoaderButton.textContent = "Copy";
          }, 1500);
        }
      }

      loaderButton.addEventListener("click", async () => {
        openModal(loaderModal);
        await copyLoaderCode();
      });

      featuresButton.addEventListener("click", () => {
        openModal(featuresModal);
      });

      utilitiesButton.addEventListener("click", () => {
        openModal(utilitiesModal);
      });

      linksButton.addEventListener("click", () => {
        openModal(linksModal);
      });

      copyLoaderButton.addEventListener("click", copyLoaderCode);

      closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          closeModal(document.getElementById(button.dataset.close));
        });
      });

      modals.forEach((modal) => {
        modal.addEventListener("click", (event) => {
          if (event.target === modal) {
            closeModal(modal);
          }
        });
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          modals.forEach(closeModal);
        }
      });

      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const target = button.dataset.tab;
          tabButtons.forEach((item) => item.classList.remove("active"));
          tabPanels.forEach((panel) => panel.classList.remove("active"));
          button.classList.add("active");
          document.getElementById(`tab-${target}`).classList.add("active");
        });
      });