import { ModalProps } from '@components/molecules/common/Modal/Modal';
import { StateCreator } from 'zustand';

type SdkProps = {};
type ModalPropsType = ModalProps & { visible: boolean };
type SdkActions = {
  onOpenModal: (params: ModalProps) => void;
  onCloseModal: () => void;
};

const initialState: ModalPropsType = {
  visible: false,
  title: undefined,
  content: undefined,
  onClose: undefined,
  onCancel: undefined,
  onConfirm: undefined,
  onDelete: undefined,
  type: 'brand',
};

export type Sdk = SdkProps & SdkActions & ModalPropsType;

const createSdkSlice: StateCreator<Sdk> = set => ({
  ...initialState,
  onOpenModal: ({ title, content, onClose, onCancel, onConfirm, onDelete, type }) =>
    set({ visible: true, title, content, onClose, type, onCancel, onConfirm, onDelete }),
  onCloseModal: () =>
    set({
      ...initialState,
    }),
});

export default createSdkSlice;
