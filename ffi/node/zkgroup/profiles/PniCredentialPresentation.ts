import ByteArray from '../internal/ByteArray';
import FFICompatArray, { FFICompatArrayType } from '../internal/FFICompatArray';

import InvalidInputException from '../errors/InvalidInputException';
import ZkGroupError from '../errors/ZkGroupError';

import Native, { FFI_RETURN_OK, FFI_RETURN_INPUT_ERROR } from '../internal/Native';

import UuidCiphertext from '../groups/UuidCiphertext';
import ProfileKeyCiphertext from '../groups/ProfileKeyCiphertext';

export default class PniCredentialPresentation extends ByteArray {

  static SIZE = 841;

  constructor(contents: FFICompatArrayType) {
    super(contents, PniCredentialPresentation.SIZE, true);

    const ffi_return = Native.FFI_PniCredentialPresentation_checkValidContents(this.contents, this.contents.length);

    if (ffi_return == FFI_RETURN_INPUT_ERROR) {
      throw new InvalidInputException('FFI_RETURN_INPUT_ERROR');
    }

    if (ffi_return != FFI_RETURN_OK) {
      throw new ZkGroupError('FFI_RETURN!=OK');
    }
  }

  getAciCiphertext(): UuidCiphertext {
    const newContents = new FFICompatArray(UuidCiphertext.SIZE);

    const ffi_return = Native.FFI_PniCredentialPresentation_getAciCiphertext(this.contents, this.contents.length, newContents, newContents.length);

    if (ffi_return != FFI_RETURN_OK) {
      throw new ZkGroupError('FFI_RETURN!=OK');
    }

    return new UuidCiphertext(newContents);
  }

  getPniCiphertext(): UuidCiphertext {
    const newContents = new FFICompatArray(UuidCiphertext.SIZE);

    const ffi_return = Native.FFI_PniCredentialPresentation_getPniCiphertext(this.contents, this.contents.length, newContents, newContents.length);

    if (ffi_return != FFI_RETURN_OK) {
      throw new ZkGroupError('FFI_RETURN!=OK');
    }

    return new UuidCiphertext(newContents);
  }

  getProfileKeyCiphertext(): ProfileKeyCiphertext {
    const newContents = new FFICompatArray(ProfileKeyCiphertext.SIZE);

    const ffi_return = Native.FFI_PniCredentialPresentation_getProfileKeyCiphertext(this.contents, this.contents.length, newContents, newContents.length);

    if (ffi_return != FFI_RETURN_OK) {
      throw new ZkGroupError('FFI_RETURN!=OK');
    }

    return new ProfileKeyCiphertext(newContents);
  }

}
