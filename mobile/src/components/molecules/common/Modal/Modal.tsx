import { IconClose, IconModalBrand, IconModalSuccess, IconModalWarning } from '@assets/svg';
import { Button } from '@components/atoms/common/Button';
import { Icon } from '@components/atoms/common/Icon';
import { Text } from '@components/atoms/common/Text';
import { useTheme } from '@hooks/useTheme';
import React, { FC, useCallback } from 'react';
import { Pressable, View, Modal as ModalRN } from 'react-native';
import { SvgProps } from 'react-native-svg';
import styled from 'styled-components';
import { ToastType } from '../Toast/Toast';
import { useSdkStore } from '@stores/index.';

export type ModalType = Exclude<ToastType, 'info' | 'network'> | 'brand' | 'delete';

export interface ModalProps {
  type?: ModalType;
  title?: string;
  content?: string;
  isShowDeleteButton?: boolean;
  onClose?: () => void;
  onDelete?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const iconType: Record<ModalType, FC<SvgProps>> = {
  success: IconModalSuccess,
  warning: IconModalWarning,
  delete: IconModalWarning,
  error: IconModalWarning,
  brand: IconModalBrand,
};

const Modal = () => {
  const { theme } = useTheme();
  const { visible, onCloseModal, onCancel, onClose, onConfirm, onDelete, title, type, content } = useSdkStore();

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
    onCloseModal();
  }, [onClose]);

  const handleDelete = useCallback(() => {
    if (onDelete) {
      onDelete();
    }
    handleClose();
  }, [onDelete, handleClose]);

  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }
    handleClose();
  }, [onConfirm, handleClose]);
  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
    handleClose();
  }, [onCancel, handleClose]);

  return (
    <ModalRN visible={visible} animationType="fade" transparent>
      <ModalWrapper>
        <ModalContentWrapper>
          <ModalTopWrapper>
            <ModalTopAction>
              <Icon icon={iconType[type as ModalType]} size={48} />
              <ButtonCloseModal onPress={handleClose}>
                <Icon icon={IconClose} size={16} />
              </ButtonCloseModal>
            </ModalTopAction>
            <NestedModalContentWrapper>
              {title && (
                <Text type="typography/bold/subtitle_1" numberOfLines={1}>
                  {title}
                </Text>
              )}
              {content && (
                <Text type="typography/regular/body_2" numberOfLines={3}>
                  {content}
                </Text>
              )}
            </NestedModalContentWrapper>
          </ModalTopWrapper>
          <ModalButtonWrapper>
            {(onDelete || onConfirm) && (
              <Button
                text="Confirm"
                size="medium"
                type="solid"
                hierarchy="primary"
                backgroundColor={theme['button/solid/primary/bg']}
                onPress={onDelete ? handleDelete : handleConfirm}
              />
            )}
            {handleCancel && (
              <Button text="Cancel" size="medium" type="outline" hierarchy="neutrals" onPress={handleCancel} />
            )}
          </ModalButtonWrapper>
        </ModalContentWrapper>
      </ModalWrapper>
    </ModalRN>
  );
};

export default Modal;

const ModalWrapper = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme['color/neutrals/01']};
  justify-content: center;
`;

const ModalContentWrapper = styled(View)`
  border-width: 1px;
  border-radius: ${({ theme }) => theme['utilities/borderradius/default']}px;
  width: 90%;
  margin: ${({ theme }) => `0px ${theme['utilities/dimensions/4']}px`};
  height: auto;
  border-color: ${({ theme }) => theme['border/primary']};
  background-color: ${({ theme }) => theme['bg/neutrals/primary']};
`;

const ModalTopWrapper = styled(View)`
  padding-top: ${({ theme }) => theme['utilities/dimensions/6']}px;
  padding-right: ${({ theme }) => theme['utilities/dimensions/6']}px;
  padding-left: ${({ theme }) => theme['utilities/dimensions/6']}px;
`;

const ModalTopAction = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonCloseModal = styled(Pressable)``;

const NestedModalContentWrapper = styled(View)`
  gap: ${({ theme }) => theme['utilities/dimensions/1']}px;
`;

const ModalButtonWrapper = styled(View)`
  padding-top: ${({ theme }) => theme['utilities/dimensions/6']}px;
  padding-bottom: ${({ theme }) => theme['utilities/dimensions/6']}px;
  margin: ${({ theme }) => `0px ${theme['utilities/dimensions/4']}px`};
  gap: ${({ theme }) => theme['utilities/dimensions/4']};
`;
