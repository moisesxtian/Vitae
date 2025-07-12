const PayPalButton = () => {
  return (
    <form
      action="https://www.paypal.com/ncp/payment/7XTLYZJMA55TC"
      method="post"
      target="_blank"
    >
      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-300 text-black font-semibold py-2 px-4 rounded mb-2"
      >
        it's free, but you can donate
      </button>
      <img src="https://www.paypalobjects.com/images/Debit_Credit.svg" alt="cards" />
    </form>
  );
};

export default PayPalButton;
