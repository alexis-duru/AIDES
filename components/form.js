import { useRef, useState } from "react";
import "react-responsive-modal/styles.css";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const form = useRef(null);
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    setSending(true);
    const id = toast.loading("En transmission ...");

    e.preventDefault();

    emailjs
      .sendForm(
        process.env.serviceMailJs,
        process.env.templateIdMailJsContact,
        form.current,
        process.env.publicKeyMailJs
      )
      .then(
        (result) => {
          toast.update(id, {
            autoClose: 2500,
            render: "Votre message a bien été envoyé !",
            type: "success",
            isLoading: false,
          });

          setTimeout(() => {
            isOpen(false);
          }, 2500);
        },
        (error) => {
          toast.update(id, {
            autoClose: 2500,
            render:
              "Une erreur est survenue, veuillez réessayer ultérieurement",
            type: "error",
            isLoading: false,
          });
          setTimeout(() => {
            isOpen(false);
          }, 2500);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <ToastContainer position="bottom-left" />
      <div className="wrapper">
        <div className="row">
          <div className="column small">
            <label htmlFor="fname">Prénom</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              required
              disabled={sending}
            />
          </div>
          <div className="column small">
            <div>
              <label htmlFor="lname">Nom</label>
            </div>
            <div>
              <input
                type="text"
                id="nom"
                name="nom"
                required
                disabled={sending}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="column small">
            <label htmlFor="telephone">Numéro de téléphone</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              required
              pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$"
              disabled={sending}
            ></input>
          </div>
          <div className="column small">
            <label htmlFor="email">Mail</label>
            <input
              required
              type="email"
              id="email"
              name="email"
              disabled={sending}
            />
          </div>
        </div>
        <div className="column">
          <div>
            <label htmlFor="message">Message</label>
          </div>
          <div>
            <textarea
              required
              id="message"
              name="message"
              disabled={sending}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="row">
        <input type="submit" value="Envoyer" disabled={sending} />
      </div>
    </form>
  );
};

export default Form;
