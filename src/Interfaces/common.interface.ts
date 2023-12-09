export interface IAllGetResponse<T> {
  statusCode?: number;
  message?: string;
  result: {
    data: T[];
    total: number;
    limit?: number;
    page?: number;
  };
}

export interface IModalProps {
  open: boolean;
  handleClose: () => void;
  title?: string;
  children?: React.ReactNode;
}
