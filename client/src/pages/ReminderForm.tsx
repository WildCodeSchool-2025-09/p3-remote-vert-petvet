function ReminderForm() {
  return (
    <form>
      <label>
        Titre
        <input type="text" />
      </label>
      <label>
        Date programmée
        <input type="text" />
      </label>
      <label>
        Description
        <input type="text" />
      </label>
      <label>
        Dosage
        <input type="text" />
      </label>
      <label>
        Fréquence
        <input type="text" />
      </label>
      <button type="submit">Créer le rappel</button>
    </form>
  );
}

export default ReminderForm;
