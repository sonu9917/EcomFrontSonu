import React, { useState } from 'react'
import Editor from 'react-simple-wysiwyg';
import {
    BtnBold,
    BtnItalic,
    EditorProvider,
    Toolbar
} from 'react-simple-wysiwyg';

const CodeEditorPage = ({value,onChange}) => {

    return (
        <EditorProvider>
            <Editor value={value} name='biography' onChange={onChange}>
                <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                </Toolbar>
            </Editor>
        </EditorProvider>
    )
}

export default CodeEditorPage