import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { interest } from "@/public/assets/data/interests";
import { city } from "@/public/assets/data/cities";

const Form = () => {
  const cityOptions = city.map((item) => ({
    id: item.id,
    label: item.Nom,
    city: item.Ville,
    postalCode: item.CodePostal,
  }));
  const form = useRef(null);
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_1ms6gls",
        "template_x2wcvi9",
        form.current,
        process.env.emailJsKey
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Votre message a bien été envoyé, merci !");
        },
        (error) => {
          console.log(error.text);
          toast.error(
            "Votre message n'a pas pu être envoyé, merci de réessayer"
          );
        }
      );
    e.target.reset();
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <ToastContainer position="bottom-left" />
      {/* For firstname */}
      <TextField
        id="firstname"
        label="Prénom"
        variant="outlined"
        name="firstname"
      />
      {/* For lastname */}
      <TextField id="lastname" label="Nom" variant="outlined" name="lastname" />
      {/* For email address */}
      <TextField
        id="email"
        label="Adresse e-mail"
        variant="outlined"
        name="email"
      />
      {/* For telephone */}
      <TextField
        id="telephone"
        label="Téléphone"
        variant="outlined"
        name="telephone"
      />
      {/* For localisation */}
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={cityOptions}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Trouve l’AIDES le plus proche de chez toi ! "
            name="localisation"
          />
        )}
        renderOption={(props, option) => (
          <li key={option.id} {...props}>
            <div>
              <span>{option.label}</span>
              <span> - {option.city}</span>
              <span> - {option.postalCode}</span>
            </div>
          </li>
        )}
      />
      {/* Interet */}
      <Autocomplete
        multiple
        id="tags-standard"
        options={interest}
        getOptionLabel={(option) => option.title}
        defaultValue={[interest[0]]}
        name="interests"
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Je souhaite recevoir la newsletter d’AIDES"
        name="newsletter"
      />
      <FormControlLabel
        control={<Checkbox />}
        label="J’accepte les conditions générales d’utilisation"
        name="conditions"
      />
      <Button className="submit" variant="contained" type="submit" value="send">
        Envoyer
      </Button>
    </form>
  );
};

export default Form;
