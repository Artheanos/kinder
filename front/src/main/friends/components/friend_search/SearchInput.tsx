import React, { ChangeEvent, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { KINDER_BACK_URL } from '../../../../common/util';

type SearchInputProps = {
    setSearchList: (list: Kinder.UserBasicObject[]) => any
}

const SearchInput: React.FC<SearchInputProps> = ({ setSearchList }) => {
    const [value, setValue] = useState('');
    const [status, setStatus] = useState('');

    let currentTimeout = useRef<NodeJS.Timeout | null>(null);

    function fetchPeople(query: string) {
        fetch(`${KINDER_BACK_URL}/friends/${query}/find`).then(res => {
            if (res.ok) {
                res.text().then(text => setSearchList(JSON.parse(text).friends))
            } else if (res.status !== 404) {
                alert(res.status);
            }
        }).catch(alert).finally(() => setStatus(''));
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        clearTimeout(currentTimeout.current!);
        setValue(e.target.value);

        if (e.target.value) {
            setStatus('Searching...');
            currentTimeout.current = setTimeout(() => fetchPeople(e.target.value), 500);
        } else {
            setStatus('');
            setSearchList([]);
        }
    }

    return (
        <div className="Search-input">
            <Form.Label>{status}</Form.Label>
            <Form.Control onChange={handleChange} value={value} />
        </div>
    )
}

export default SearchInput;