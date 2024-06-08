type PlayerTabProps = {
  title: string;
  value: string | undefined;
  active: boolean;
};

export default function PlayerTab({ title, value, active }: PlayerTabProps) {
  return (
    <div className="relative">
      {value && !active && (
        <div className="absolute inset-0 z-10 rounded opacity-45 bg-app-text"></div>
      )}
      <p className="relative py-1 rounded shadow-2xl bg-app-board-background">
        {title}
        <span className="block pt-2 pb-1 mx-2 text-lg rounded sm:text-2xl bg-app-bg">
          {value}
        </span>
      </p>
    </div>
  );
}
