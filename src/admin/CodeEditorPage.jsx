import React, { useState } from 'react'
import Editor from 'react-simple-wysiwyg';
import {
    BtnBold,
    BtnItalic,
    EditorProvider,
    Toolbar
} from 'react-simple-wysiwyg';

const CodeEditorPage = () => {

    const [html, setHtml] = useState('my <b>HTML</b>');
    const [value, setValue] = useState('simple text');

    function onChange(e) {
        setValue(e.target.value);
    }

    return (
        <EditorProvider>
            <Editor value={value} onChange={onChange}>
                <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                </Toolbar>
            </Editor>
        </EditorProvider>
    )
}

export default CodeEditorPage