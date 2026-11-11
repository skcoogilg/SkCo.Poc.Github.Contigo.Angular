import { CheckboxProperties } from '@interfaces/checkbox.interface';

export interface FullTableOptions {
  keys: string[];
  labelColumns: string[];
  alignmentColumns?: ('start' | 'center' | 'end')[];
  defaultData: any[];
  columnTypes?: (
    | 'string'
    | 'number'
    | 'money'
    | 'percent'
    | 'date'
    | 'action'
  )[];
  columnIcons?: (row: any) => string[];
  positionColumnIcons?: (row: any) => ('' | 'start' | 'end')[];
  tooltipsColumnIcons?: (row: any) => string[];
  headersTooltips?: string[];
  canSort: boolean;
  disableActionsColumn?: boolean;
  customRowStyle?: (row: any, index?: number) => any;
  customColumnStyle?: { [key: string]: any };
  hasActions: boolean;
  hideDefaultActions?: {
    customize: boolean;
    copy: boolean;
    graph: boolean;
    analyzeWithSami: boolean;
    [key: string]: boolean;
  };
  disableActions?: string[];
  customActions?: CustomAction[];
  customizeId?: number;
  hasPaginator: boolean;
  indexDBKey?: number;
  showColumns?: { [key: string]: boolean };
  checkboxSettings?: CheckboxProperties;
  labelActionColumn?: string;
  showIndexColumn?: boolean;
  indexColumnType?: 'number' | 'point';
  pointColors?: string[];
  hiddenColumnHeaders?: string[];
  hasRowActions?: boolean;
  rowActions?: RowCustomAction[];
  rowActionsPosition?: 'start' | 'end';
  rowActionsTitle?: string;
  rowTooltip?: (row: any, index: number) => string;
  headerIcons?: string[];
  positionHeaderIcons?: ('' | 'start' | 'end')[];
  tooltipsHeaderIcons?: string[];
}

export interface CustomAction {
  iconUrl: string;
  name: string;
  action: () => void;
  key: string;
  tooltip?: string;
  disableText?: string;
}

export interface RowCustomAction {
  iconUrl: string;
  name: string;
  action: (row: any) => void;
  key: string;
  tooltip?: string;
  disableText?: string;
}
