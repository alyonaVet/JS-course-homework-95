import React, {ChangeEvent, useRef, useState} from 'react';
import {Box, Button, FormHelperText, TextField} from '@mui/material';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  label: string;
  error?: boolean;
  helperText?: string;
}

const FileInput: React.FC<Props> = ({onChange, name, label, error, helperText}) => {
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFilename(event.target.files[0].name);
    } else {
      setFilename('');
    }
    onChange(event);
  };

  return (
    <>
      <input type="file" name={name} style={{display: 'none'}} ref={inputRef} onChange={onFileChange}/>
      <Box display="flex" alignItems="center" gap={2}>
        <Box flex={1}>
          <TextField
            label={label}
            slotProps={{input: {readOnly: true}}}
            value={filename}
            onClick={activateInput}
            error={error}
            fullWidth
          />
          {error && <FormHelperText error>{helperText}</FormHelperText>}

        </Box>
        <Box width="25%">
          <Button variant="outlined" onClick={activateInput}>
            Browse
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FileInput;
