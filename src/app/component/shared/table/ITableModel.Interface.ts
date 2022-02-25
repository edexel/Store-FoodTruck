export interface ITableModel {
  dataPaging: {
    page: number;
    take: number;
    total: number;
    pageTotal: number;
  };
  colGrid:[{
    field: string;
    header: string;
  }];
  buttonTable: {
    editButon?: {
      active: boolean;
      isModal?: boolean;
      url: string;
      fieldId?: string;
    };
    deleteButon?: {
      active: boolean;
      isModal?: boolean;
      url: string;
      fieldId?: string;
    };
    DetailButon?: {
      active: boolean;
      isModal?: boolean;
      url: string;
      fieldId?: string;
    };
  };
}
