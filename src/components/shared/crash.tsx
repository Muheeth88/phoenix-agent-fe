const crash = ({ crashMessage }: { crashMessage: string }) => {
  return (
    <div>
      <h3>Something went wrong</h3>
      <p>{crashMessage}</p>
    </div>
  );
};

export default crash;
