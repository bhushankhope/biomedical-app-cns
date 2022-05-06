export interface AnotomyInformation {
    _embedded: Embedded;
  }
  export interface Embedded {
    terms: (TermsEntity)[];
  }
  export interface TermsEntity {
    iri: string;
    label: string;
    description?: null;
    annotation: Annotation;
    obo_id: string;
  }
  export interface Annotation {
    definition?: (string)[] | null;
  }