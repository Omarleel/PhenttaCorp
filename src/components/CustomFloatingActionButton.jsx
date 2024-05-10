export const CustomFloatingActionButton = ({ icon, className, position, onClick }) => {
  const [verticalPosition, horizontalPosition] = position.split(' ');

  let verticalPositionClass = '';
  let horizontalPositionClass = '';

  switch (verticalPosition) {
    case 'bottom':
      verticalPositionClass = 'bottom-10';
      break;
    case 'top':
      verticalPositionClass = 'top-10';
      break;
    default:
      verticalPositionClass = 'bottom-10'; // Valor por defecto
      break;
  }

  switch (horizontalPosition) {
    case 'right':
      horizontalPositionClass = 'right-10';
      break;
    case 'left':
      horizontalPositionClass = 'left-10';
      break;
    default:
      horizontalPositionClass = 'right-10'; // Valor por defecto
      break;
  }

  return (
    <div
      className={`fixed ${verticalPositionClass} ${horizontalPositionClass} z-20 w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer ${className}`}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};
