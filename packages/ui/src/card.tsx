interface cardProps{
  className?: string;
  title: string;
  children ?: React.ReactNode;
}

export function Card({className="empty",title,children}:cardProps): JSX.Element {
  return (
    <div className={className==="empty"?"border p-6 bg-white rounded-xl bg-[#ededed]":`${className}`} >
      <h1 className="text-xl border-b pb-2">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
