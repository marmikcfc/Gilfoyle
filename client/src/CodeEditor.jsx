import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export function CodeEditor(props) {
    const editorRef = useRef(null);

    const monacoRef = useRef(null);
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        monacoRef.current = monaco;
    }

    function showValue() {
        alert(editorRef.current.getValue());
    }

    const [languages, setLanguages] = useState([
        "javascript",
        "python",
        "java",
        "c++",
        "ruby",
        "php"
    ]);
    const [language, setLanguage] = useState("javascript");

    function handleChange(event) {
        monacoRef.current.editor.setModelLanguage(editorRef.current.getModel(), event.target.value);
        setLanguage(event.target.value);
    }


    return (
        <div>

            {/* <button onClick={showValue}>Show value</button> */}

            <FormControl>
                <InputLabel htmlFor="programming-language">Programming Langugage</InputLabel>
                <Select
                    value={language}
                    onChange={handleChange}
                    inputProps={{
                        name: "programming language",
                        id: "programming-languge"
                    }}
                >
                    {languages.map((value, index) => {
                        return <MenuItem value={value}>{value}</MenuItem>;
                    })}
                </Select>
            </FormControl>

            <Editor
                height="80vh"
                theme="vs-dark"
                defaultLanguage="python"
                defaultValue={props.initialContent}
                onMount={handleEditorDidMount}
            />
        </div>
    )
}