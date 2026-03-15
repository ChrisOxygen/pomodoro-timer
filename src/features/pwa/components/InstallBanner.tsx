import { motion, AnimatePresence } from "framer-motion";
import { MdInstallMobile } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { useInstallPrompt } from "../hooks/useInstallPrompt";

function InstallBanner() {
  const { isInstallable, install, dismiss } = useInstallPrompt();

  return (
    <AnimatePresence>
      {isInstallable && (
        <motion.div
          role="banner"
          aria-label="Install Pomodoro app"
          className="fixed bottom-[calc(var(--sab,0px)+16px)] left-1/2 flex items-center gap-3 bg-dark-2 rounded-pill px-5 py-3 shadow-lg"
          initial={{ y: 80, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 80, opacity: 0, x: "-50%" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <MdInstallMobile
            className="text-xl shrink-0"
            style={{ color: "var(--main-color)" }}
          />
          <button
            onClick={install}
            className="text-faded-blue text-sm font-bold tracking-wide hover:text-white transition-colors"
          >
            Install App
          </button>
          <button
            onClick={dismiss}
            aria-label="Dismiss install prompt"
            className="text-faded-blue opacity-50 hover:opacity-100 text-lg transition-opacity"
          >
            <IoCloseOutline />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InstallBanner;
